import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import getRealm from '../../services/realm';

import Repository from '../../components/Repository';

import {Container, Form, Input, List, Submit, Title} from './styles';

const Main: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    async function loadRepository(){
      const realm = await getRealm();
      
      const data = realm.objects('Repository').sorted('stars', true);

      setRepositories(data);
    };

    loadRepository();
  }, []);

  async function saveRepository(repository: any) {
    const data = {
      id: repository.id,
      name: repository.name,
      fullname: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });

    return data;
  }

  async function handleAddRepository() {
    try {
      const res = await api.get(`/repos/${input}`);

      await saveRepository(res.data);
      setInput('');
      setError(false);
      Keyboard.dismiss();
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  async function handleRefreshRepository(repository: any){
    const res = await api.get(`/repos/${repository.fullname}`);

    const data = await saveRepository(res.data);

    setRepositories(repositories.map(repo => repo.id === data.id ? data : repo));
  }

  return (
    <Container>
      <Title>Repositórios</Title>
      <Form>
        <Input
          error={error}
          value={input}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar repositório..."
        />
        <Submit onPress={handleAddRepository}>
          <Icon name="add" size={22} color="#FFF" />
        </Submit>
      </Form>
      <List
        keyboardShouldPersistTaps="handled"
        data={repositories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <Repository data={item} onRefresh={()=>handleRefreshRepository(item)}/>}
      />
    </Container>
  );
};

export default Main;
