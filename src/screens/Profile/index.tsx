import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import { BackButton } from '../../components/BackButton';
import { useNavigation } from '@react-navigation/core';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import { PasswordInput } from '../../components/PasswordInput';

import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import {
  Container,
  Header,
  ContentHeader,
  Title,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export function Profile() {
  const { user, signOut, updatedUser } = useAuth();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driver_license, setDriver_license] = useState(user.driver_license);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleUpdateProfile() {
    try {
      const schema = Yup.object().shape({
        driver_license: Yup.string()
          .required('CNH é obrigatório'),
        name: Yup.string()
          .required('Nome é obrigatório'),
      });

      const data = { name, driver_license };
      await schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driver_license,
        avatar,
        token: user.token
      });
      Alert.alert('Perfil atualizado com sucesso!');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else{
        Alert.alert('Ops', 'Não foi possível atualizar o perfil');
        console.log(error);
      }  
    }
  }

  function handleSignOut() {
    Alert.alert(
      'Tem Certeza? ',
      'Se Você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
        },
        {
          text: 'Confirmar',
          onPress: () => signOut()
        }
      ]
    )
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <ContentHeader>
              <BackButton
                onPress={handleBack}
              />
              <Title>Editar Perfil</Title>
              <LogoutButton onPress={handleSignOut}>
                <Feather
                  name='power'
                  size={24}
                  color={theme.colors.text_detail}
                />
              </LogoutButton>
            </ContentHeader>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.background_secondary}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight()}}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={true}>
                  Dados
                </OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={false} >
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ?
              <Section>
                <Input
                  iconName='user'
                  autoCorrect={false}
                  autoCapitalize='words'
                  defaultValue={user.name}
                  onChangeText={setName}
                />

                <Input
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />

                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                  onChangeText={setDriver_license}
                />

              </Section>
              :
              <Section>
                <PasswordInput
                  iconName='lock'
                  placeholder='Senha atual'
                  autoCapitalize='words'
                />

                <PasswordInput
                  iconName='lock'
                  placeholder='Senha'
                  editable={false}
                />

                <PasswordInput
                  iconName='lock'
                  placeholder='Repetir senha'
                  keyboardType='numeric'
                />
              </Section>
            }
            <Button
              title='Salvar alterações'
              onPress={handleUpdateProfile}
            />
            </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}