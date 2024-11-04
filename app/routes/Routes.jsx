import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {ComandaDetalhe} from '@/components/ComandaDetalhe'
import HomeScreen from '../(tabs)/home.tsx'


const Stack = createStackNavigator();

const Routes = () =>  {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="ComandaDetalhe" component={ComandaDetalhe} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default Routes;