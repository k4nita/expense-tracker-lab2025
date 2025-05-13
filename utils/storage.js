import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = 'expenses';

export const saveExpenseOffline = async (expense) => {
  try {
    const existingData = await AsyncStorage.getItem(EXPENSES_KEY);
    const expenses = existingData ? JSON.parse(existingData) : [];
    expenses.push(expense);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expense offline:', error);
  }
};

export const getOfflineExpenses = async () => {
  try {
    const data = await AsyncStorage.getItem(EXPENSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving offline expenses:', error);
    return [];
  }
};

export const clearOfflineExpenses = async () => {
  try {
    await AsyncStorage.removeItem(EXPENSES_KEY);
  } catch (error) {
    console.error('Error clearing offline expenses:', error);
  }
};
