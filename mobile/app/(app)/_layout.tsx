import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The Tabs Layout (Home, Orders, Profile) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Stack Screens (Pushed on top of tabs) */}
      <Stack.Screen name="canteen" options={{ presentation: 'card' }} />
      <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
      <Stack.Screen name="order-details/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="payment" options={{ presentation: 'modal' }} />
      
      {/* Profile Sub-screens */}
      <Stack.Screen name="profile/edit" options={{ title: 'Edit Profile', headerShown: true }} />
      <Stack.Screen name="profile/orders" options={{ title: 'My Orders', headerShown: true }} />
      <Stack.Screen name="profile/help" options={{ title: 'Help', headerShown: true }} />
    </Stack>
  );
}
