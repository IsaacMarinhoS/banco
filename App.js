import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';

const ContaScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isAccountConnected, setIsAccountConnected] = useState(false);
  const [inputName, setInputName] = useState('');
  const [showInputFields, setShowInputFields] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [balance, setBalance] = useState(40000.00);

  const handleConnectAccount = () => {
    if (inputName && password) {
      setUserName(inputName);
      setIsAccountConnected(true);
      setShowInputFields(false);
      setInputName(''); 
      setPassword('');  
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleShowInputFields = () => {
    setShowInputFields(true);
  };

  const handleAddTransaction = () => {
    if (amount && description) {
      const newTransaction = {
        id: Math.random().toString(),
        amount: parseFloat(amount),
        description,
      };
      setTransactions((prev) => [...prev, newTransaction]);
      setBalance(prevBalance => prevBalance - newTransaction.amount);
      setAmount('');
      setDescription('');
    } else {
      alert('Por favor, preencha todos os campos da transação.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PicPay</Text>
        {isAccountConnected && <Text style={styles.userName}>{userName}</Text>}
      </View>

      <View style={styles.accountContainer}>
        {!isAccountConnected && !showInputFields && (
          <TouchableOpacity style={styles.connectButton} onPress={handleShowInputFields}>
            <Text style={styles.connectText}>+ Conectar conta</Text>
          </TouchableOpacity>
        )}

        {showInputFields && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              value={inputName}
              onChangeText={setInputName}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.finalizeButton} onPress={handleConnectAccount}>
              <Text style={styles.finalizeText}>Conectar</Text>
            </TouchableOpacity>
          </View>
        )}

        {isAccountConnected && (
          <>
            <View style={styles.saldoContainer}>
              <Text style={styles.saldoTitle}>Saldo disponível</Text>
              <Text style={styles.saldoValue}>R$ {balance.toFixed(2)}</Text>
            </View>

            <View style={styles.transactionContainer}>
              <Text style={styles.transactionTitle}>Adicionar Transação PIX</Text>
              <TextInput
                style={styles.input}
                placeholder="Valor (ex: 50.00)"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Descrição (ex: Pagamento de conta)"
                value={description}
                onChangeText={setDescription}
              />
              <TouchableOpacity style={styles.addTransactionButton} onPress={handleAddTransaction}>
                <Text style={styles.addTransactionText}>Adicionar Transação</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.extractContainer}>
              <Text style={styles.extractTitle}>Extrato</Text>
              <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.transactionItem}>
                    <Text style={styles.transactionDescription}>{item.description}</Text>
                    <Text style={styles.transactionAmount}>R$ {item.amount.toFixed(2)}</Text>
                  </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma transação encontrada.</Text>}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#04b5a6',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#04b5a6',
  },
  accountContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saldoContainer: {
    backgroundColor: '#04b5a6',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  saldoTitle: {
    color: '#fff',
    fontSize: 16,
  },
  saldoValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  transactionContainer: {
    marginTop: 20,
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 1,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addTransactionButton: {
    backgroundColor: '#04b5a6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addTransactionText: {
    color: '#fff',
    textAlign: 'center',
  },
  extractContainer: {
    backgroundColor: '#e9f5f5',
    padding: 15,
    borderRadius: 10,
  },
  extractTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#04b5a6',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionDescription: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#04b5a6',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  connectButton: {
    backgroundColor: '#04b5a6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  connectText: {
    color: '#fff',
    fontSize: 16,
  },
  finalizeButton: {
    backgroundColor: '#04b5a6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  finalizeText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ContaScreen;
