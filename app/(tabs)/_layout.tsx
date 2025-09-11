import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";


export default function TabBar() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ 
                title: "Hjem",
                tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={24} /> }}/>
            <Tabs.Screen name="profile" options={{ 
                title: "Profil", 
                tabBarIcon: ({ color }) => <MaterialIcons name="person" color={color} size={24} /> }}/>
        </Tabs>
    )
}