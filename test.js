import { View, Text } from 'react-native'
import React from 'react'

const test = () => {
  return (
    <View>
    <View>
      <TouchableOpacity>
        
            <Text className="text-right text-base text-colorBlue">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <TouchableOpacity className="rounded-full bg-colorBlue py-4" onPress={handleLogin}>
            <Text className="text-center text-lg font-semibold text-white">Log In</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="font-semibold text-colorBlue">Sign Up</Text>
          </TouchableOpacity>
        </View>

        
    
    </View>
  )
}

export default test