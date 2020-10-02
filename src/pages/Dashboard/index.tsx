import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { 
    Container, 
    Header, 
    HeaderTitle, 
    UserName, 
    ProfileButton, 
    UserAvatar, 
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProvidersInfo,
    ProviderName,
    ProviderMeta,
    ProviderMetaText,
    ProviderListTitle
} from './styles';

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const Dashboard: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const { signOut, user } = useAuth();
    const { navigate } = useNavigation();

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        })
    }, []);

    const navigateToProfile = useCallback(() => {
        // navigate('Profile');
        signOut();
    }, [navigate]);

    const navigateToCreateAppointment = useCallback((providerId: string) => {
        navigate('CreateAppointment', { providerId })
    }, [navigate]);

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo, {"\n"}
                    <UserName>{user.name}</UserName>
                </HeaderTitle>

                <ProfileButton onPress={navigateToProfile}>
                    <UserAvatar source={{ uri: user.avatar_url }} />
                </ProfileButton>
            </Header>

            <ProvidersList
                data={providers}
                keyExtractor={provider => provider.id}
                ListHeaderComponent={ 
                    <ProviderListTitle>Cabeleireiros</ProviderListTitle>
                }
                renderItem={({ item }) => (
                    <ProviderContainer onPress={() => navigateToCreateAppointment(item.id)}>
                        <ProviderAvatar source={{ uri: item.avatar_url }} />

                        <ProvidersInfo>
                            <ProviderName>{item.name}</ProviderName>

                            <ProviderMeta>
                                <Icon name="calendar" size={14} color="#ff9000" />
                                <ProviderMetaText>Segunda á sexta</ProviderMetaText>
                            </ProviderMeta>

                            <ProviderMeta>
                                <Icon name="clock" size={14} color="#ff9000" />
                                <ProviderMetaText>8h ás 18h</ProviderMetaText>
                            </ProviderMeta>

                        </ProvidersInfo>
                    </ProviderContainer>
                )}
            />
        </Container>
    )
}

export default Dashboard;