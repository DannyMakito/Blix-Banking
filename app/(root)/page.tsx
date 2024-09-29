import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import React from 'react'

const Home = () => {

const loggedIn = {firstName:'Makito', lastName:'Daniel', email:'maki@gmail.com'};

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
               <HeaderBox 
               //props
               type="greeting"
               title ="Welcome"
               user={loggedIn?.firstName || 'Guest'}
               subtext="Access and manage your account and transaction easily"

               />
            </header>        

            RECENT TRANSACTION
     </div>

     <RightSidebar 
     
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 123.50}, {currentBalance: 789.50}]}
     />

    </section>
  )
}

export default Home