import { useState } from 'react'
import SideBar from './SideBar'
import AccountInfo from './AccountInfo'
import MyRestaurants from './MyRestaurants'
import './AccountPage.css'

const AccountPage = () => {
    const [selectedTab, setSelectedTab] = useState('account');

    const handleTabSelect = (tab) => {
        setSelectedTab(tab)
    }

    return (
        <>
        <div><SideBar handleTabSelect={handleTabSelect}/></div>
        <div>
           {selectedTab==='account' && <AccountInfo />}
           {selectedTab==='myRestaurants' && <MyRestaurants />}
        </div>
        </>
    )

}


export default AccountPage
