import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';
import { Dropdown } from 'react-native-element-dropdown';

export default function App() {

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([{name: "Undefined"}]);
  const [goals, setGoals] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Undefined");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [goalAmount, setGoalAmount] = useState(0);
  const [goalCategory, setGoalCategory] = useState("");
  const [expenseErrors, setExpenseErrors] = useState([]);
  const [categoryErrors, setCategoryErrors] = useState([]);
  const [goalErrors, setGoalErrors] = useState([]);

  const createExpense = () => {
    if(showExpenseForm)
    {
      let errors = validateExpenseForm();
      if(errors.length == 0)
      {
        setExpenses([
          ...expenses,
          {
            description: expenseDescription, 
            amount: expenseAmount, 
            category: categories.find(x => x.name == expenseCategory)}
        ]);
        setExpenseDescription("");
        setExpenseAmount(0);
        setExpenseCategory("");
        setShowExpenseForm(false);
      }
      else
      {
        setExpenseErrors(errors);
      }
    }
    else
    {
      setShowExpenseForm(true);
    }
  }

  const createCategory = () => {
    if(showCategoryForm)
    {
      let errors = validateCategoryForm();
      if(errors.length == 0)
      {
        setCategories([
          ...categories,
          {name: categoryName}
        ]);
        setCategoryName("");
        setShowCategoryForm(false);
      }
      else
      {
        setCategoryErrors(errors);
      }
    }
    else
    {
      setShowCategoryForm(true);
    }
  }

  const createGoal = () => {
    if(showGoalForm)
    {
      let errors = validateGoalForm();
      if(errors.length == 0)
      {
        setGoals([
          ...goals,
          {
            category: categories.find(x => x.name == goalCategory), 
            amount: goalAmount}
        ]);
        setGoalAmount(0);
        setGoalCategory("");
        setShowGoalForm(false);
      }
      else
      {
        setGoalErrors(errors);
      }
    }
    else
    {
      setShowGoalForm(true);
    }
  }

  const validateExpenseForm = () => {
    let errors = [];
    if(!expenseDescription)
    {
      errors.push("Expense description should not be empty");
    }
    if(!expenseAmount)
    {
      errors.push("Expense amount should not be empty");
    }
    if(!expenseCategory)
    {
      errors.push("Expense category should not be empty");
    }
    return errors;
  }

  const validateCategoryForm = () => {
    let errors = [];
    if(!categoryName)
    {
      errors.push("Category Name should not be empty");
    }
    return errors;
  }

  const validateGoalForm = () => {
    let errors = [];
    if(!goalAmount)
    {
      errors.push("Goal Amount should not be empty");
    }
    if(!goalCategory)
    {
      errors.push("Goal Category should not be empty");
    }
    return errors;
  }

  const createCategories = () => {
    return categories.map((category) => ({label: category.name, value: category.name, key: category.name}));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expenses</Text>
      {showExpenseForm && 
      (<View>
        <TextInput 
          onChangeText={setExpenseDescription}
          value={expenseDescription}
          placeholder="Expense Description"
          style={styles.input}
        />
        <CurrencyInput 
          value={expenseAmount}
          onChangeValue={setExpenseAmount}
          delimiter=','
          separator='.'
          style={styles.input}
        />
        <Dropdown
          data={createCategories()}
          value={expenseCategory}
          onChange={item => setExpenseCategory(item.value)}
          labelField={"label"}
          valueField={"value"}
          placeholder='Select Category'
        />
      </View>)}
      {expenseErrors.map((error, index) =>
        <View key={index}>
          <Text>{error}</Text>
        </View>
      )}
      <Button title={showExpenseForm ? "Create Expense" : "New Expense"} onPress={createExpense}/>
      {expenses.map((expense, index) => 
          <View key={index}>
            <View>
              <Text>{expense.description}</Text>
            </View>
            <View>
              <Text>{expense.amount}</Text>
            </View>
            <View>
              <Text>{expense.category.name}</Text>
            </View>
          </View>
        )}
      <Text style={styles.heading}>{"\n"}Categories</Text>
      {showCategoryForm &&
      (
        <View>
          <TextInput 
            onChangeText={setCategoryName}
            value={categoryName}
            placeholder="Category Name"
            style={styles.input}
          />
        </View>
      )}
      {categoryErrors.map((error, index) =>
        <View key={index}>
          <Text>{error}</Text>
        </View>
      )}
      <Button title={showCategoryForm ? "Create Category" : "New Category"} onPress={createCategory}/>
      {categories.map(category => 
            <View>
              <Text>{category.name}</Text>
            </View>
        )}
      <Text style={styles.heading}>{"\n"}Goals</Text>
      {showGoalForm && (
        <View>
          <CurrencyInput 
            value={goalAmount}
            onChangeValue={setGoalAmount}
            delimiter=','
            separator='.'
            style={styles.input}
          />
          <Dropdown
            data={createCategories()}
            value={goalCategory}
            onChange={item => setGoalCategory(item.value)}
            labelField={"label"}
            valueField={"value"}
            placeholder='Select Category'
          />
        </View>
      )}
      {goalErrors.map((error, index) =>
        <View key={index}>
          <Text>{error}</Text>
        </View>
      )}
      <Button title={showGoalForm ? "Create Goal" : "New Goal"} onPress={createGoal}/>
      {goals.map(goal => 
          <View>
            <View>
              <Text>{goal.category.name}</Text>
            </View>
            <View>
              <Text>{goal.amount}</Text>
            </View>
          </View>
        )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    paddingBottom: 10
  },
  input: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  }
});
