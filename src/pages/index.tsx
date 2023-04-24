import type { NextPage } from 'next'
import ListTodo from '@/components/ListTodo'
import HeadPage from '@/components/layouts/Head'
import { Provider } from 'react-redux'
import store from '../redux/store';


const Home: NextPage = () => {
  return (
    <>
      <Provider store={store}>
        <HeadPage title="List Todo" />     
        <ListTodo/>
      </Provider>
    </>
  )
}

export default Home
