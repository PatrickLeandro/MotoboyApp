import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const datas = [

 

];


export default function App() {

  const [total, setTotal] = useState(0);

  const [ data, setData ] = useState([]);

  const [endereco, setEndereco] = useState('')
  const [valorTaxa, setValorTaxa] = useState('')


  var diaSem = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
  const getCurrentDate=()=>{

    var date = new Date().getDate(); //Dia

    var month = new Date().getMonth() + 1; //Mês

    var year = new Date().getFullYear(); //Ano

    var daySemana = new Date().getDay()

    return diaSem[daySemana];//format: dd-mm-yyyy;

  }

  
  useEffect(() => {

    setData(datas);

    var teste = [];

    var soma = 0;

    for (var i = 0; i < datas.length; i++) {

       teste[i] = parseInt(datas[i].valorEntrega);

       soma += parseInt(teste[i]);

    }

    setTotal(soma);

  }, []);

  function addToList() {
    var idRandomico = Math.random();

    idRandomico = Math.floor(idRandomico * 9999999999);
    data.push({
      id: `${idRandomico}`,
      date: `${getCurrentDate()}`,
      endereço: `${endereco}`,
      valorEntrega: `${valorTaxa}`,
      total: 0});
    setData([...data]);
    setTotal(total+ Number(valorTaxa))
    setEndereco('');
    setValorTaxa('');
  }


  const renderItem = ({ item }) => (
    <View >

      <TouchableOpacity style={styles.flat} 
        onPress={ () => { setTotal(total+ Number(item.valorEntrega)) }}
      >

      <Text style={styles.endereço}>{ item.endereço }</Text>

      <Text style={styles.valorEntrega}>R$ { item.valorEntrega }</Text>

      </TouchableOpacity>

    </View>
  );

  

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} 
      style={styles.container}
    >
    <Text style={styles.date}>{ getCurrentDate() }</Text>

      <View style={styles.header}>


        <Text style={styles.totalEntregas}>{ total }</Text>

      </View>

      <FlatList 
        data = { data }
        renderItem = { renderItem }
        keyExtractor = { item => item.id }
      />

      <TouchableOpacity style={styles.btn} onPress={  addToList }>

        <Text style={styles.btnTxt}>+</Text>

      </TouchableOpacity>


      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={endereco}
          onChangeText={(valor) => setEndereco(valor)}
          placeholder="Comanda ou endereço"
        />
        
        <TextInput
          style={styles.input}
          value={valorTaxa}
          onChangeText={(valor) => setValorTaxa(valor)}
          placeholder="Valor da taxa"
          keyboardType="numeric"
        />
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },

  header:{
    width: 100, 
    height: 100,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25

  },

  totalEntregas:{
    fontSize: 55,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  btn:{
    position: 'absolute',
    bottom: 58,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    zIndex: 2
  },

  btnTxt:{
    fontSize: 35,
    position: 'relative',
    bottom: 1,
    color: 'white',
    color: 'white',
  },

  flat:{
    flexDirection: 'row',
    marginTop: 1,
    width: '97%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },

  endereço:{
    fontSize: 20,
    width: '90%',
    flexDirection: 'row',
    color: 'white',
  },
  
  valorEntrega: {
    fontSize: 16,
    color: 'white',
  },
  input:{
    borderBottomColor: '#b2bec3',
    borderBottomWidth: 1,
    height: 50,
    width: '75%',
    fontSize: 19,
    color: 'white',
  },
  footer:{
    width: '95%',
    marginBottom: 60

  },
  date:{
    fontSize: 20,
    color: 'white',
  },

});
