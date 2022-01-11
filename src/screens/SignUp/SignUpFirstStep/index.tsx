import React, { useState } from 'react';
import { BackButton } from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Bullet } from '../../../components/Bullet';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
  Footer,
} from './styles';
import * as Yup from 'yup';

export function SignUpFirstStep() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  async function handleNextStep() {
    try {
      const shema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CHN é obrigatório'),
        email: Yup.string()
        .email('E-mail inválido')
        .required('Email é obrigatório!'),
        name: Yup.string()
          .required('Nome é obrigatório!'),
      });

      const data = { name, email, driverLicense }
      await shema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      }
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>

          </Header>
          <Title>
            Crie sua{'\n'}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              autoCorrect={false}
              autoCapitalize='words'
              onChangeText={setName}
              value={name}
            />

            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setDriverLicense}
              value={driverLicense}
            />

          </Form>

          <Footer>
            <Button
              title='Próximo'
              onPress={handleNextStep}
              enabled
              loading={false}
            />
          </Footer>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}