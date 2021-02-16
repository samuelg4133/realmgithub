import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, Description, Name, Refresh, RefreshText, Stat, StatCount, Stats } from './styles';

interface RepositoryProps{
  data: {
    name: string,
    description: string,
    stars: string,
    forks: string,
  },
  onRefresh: ()=>{}
}

const Repository: React.FC<RepositoryProps> = ({data, onRefresh}) => {
  return (
    <Container>
      <Name>{data.name}</Name>
      <Description>{data.description}</Description>
      <Stats>
        <Stat>
          <Icon name="star" size={16} color="#333"/>
          <StatCount>
            {data.stars}
          </StatCount>
        </Stat>
        <Stat>
          <Icon name="code-fork" size={16} color="#333"/>
          <StatCount>
            {data.forks}
          </StatCount>
        </Stat>
        </Stats>
        <Refresh onPress={onRefresh}>
          <Icon name="refresh" color="#7159C1" size={16}/>
          <RefreshText>Atualizar</RefreshText>
        </Refresh>
    </Container>
  );
}

export default Repository;