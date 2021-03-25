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
  const [pageApp, setPageApp] = useState(true)


  var diaSem = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
  const getCurrentDate=()=>{

    var date = new Date().getDate(); //Dia

    var month = new Date().getMonth() + 1; //Mês

    var year = new Date().getFullYear(); //Ano

    var daySemana = new Date().getDay()

    return diaSem[daySemana] + ' - ' + date+'/'+month+'/'+year;//format: dd-mm-yyyy;

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

  function pageAdd() {
    setPageApp(false)
  }

  function addToList() {
    var idRandomico = Math.random();

    if (valorTaxa == '') {
      alert('Verifique o campo: Valor da taxa') // Verifica se o campo taxa foi preenchido

    } else if (endereco == ''){
      alert('Verifique o campo: Comanda ou endereço') // Verifica se o campo endereço foi preenchido

    }else{ // caso todos os campos sejam preenchidos então:

      idRandomico = Math.floor(idRandomico * 9999999999); // gera um número aleatório entre 9.999.999.999 opções
      data.push({                                         // adiciona itens ao array data
      id: `${idRandomico}`,                               // adiciona o último número aleatório no id
      date: `${getCurrentDate()}`,                        // adiciona a data
      endereço: `${endereco}`,                            // pega o valor do input endereço
      valorEntrega: `${valorTaxa}`,                       // pega o valor do input taxa
      total: `${total+ Number(valorTaxa)}`});             // pega o valor total atual e adiciona o valor da taxa
      setData([...data]);                                 
      setTotal(total+ Number(valorTaxa))                  // altera o valor atual de total 
      setEndereco('');                                    // retornar o valor inicial de endereço
      setValorTaxa('');                                   // retornar o valor inicial de taxa
      setPageApp(true)                                    // retorna o valor de page app e volta para a tela inicial

    }
    
  }

  function cancel() {
    setPageApp(true)                                    // retorna o valor de page app e volta para a tela inicial
    
  }


  const renderItem = ({ item }) => ( // função que retorna o flatList
    
      <View style={styles.flat} >
          <Text style={styles.endereço}>{ item.endereço }</Text>
          <Text style={styles.valorEntrega}>R$ { item.valorEntrega }</Text>
      </View>
  );

  

  return (
    <LinearGradient
      colors={['#2d3436', '#636e72']} 
      style={styles.linear}
    >
      
      <Text style={styles.date}>{ getCurrentDate() }</Text> 
      {/* A função chamada através deste text retorna a data atual no formato (diaDaSemana - dd/mm/aaaa )*/}
      

      { pageApp ?  //#################  Condicional para Page HOME ou Page ADD ENTREGA  ################# 
      
      
      //#################  Abaixo page HOME ################# 
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={styles.totalEntregas}>{ total }</Text>
            </View>

            <FlatList 
              data = { data }
              renderItem = { renderItem }
              keyExtractor = { item => item.id }
            />

            <TouchableOpacity style={styles.btnAdd} onPress={  pageAdd }>

            <Text style={styles.btnTxt}>+</Text>

            </TouchableOpacity>
        </View> 
        
        
        :      //#################  Abaixo page Adicionar entrega  ################# 

    
      <View style={styles.viewAdd}>
          


          <View style={styles.viewInput}>
            <TextInput          // este input solicita o endereço ou número da comanda
              style={styles.input}
              value={endereco}
              onChangeText={(valor) => setEndereco(valor)}
              placeholder="Comanda ou endereço"
              placeholderTextColor='#b2bec3'
            />
            
            <TextInput                  // este input solicita o valor da taxa da entrega feita
              style={styles.input}
              value={valorTaxa}
              onChangeText={(valor) => setValorTaxa(valor)}
              placeholder="Valor da taxa"
              placeholderTextColor='#b2bec3'
              keyboardType="numeric"
            />
          </View>

          <View style={styles.viewBtn}>

                <TouchableOpacity style={styles.btnAddListCancel} onPress={  cancel }>
                  <Text style={styles.btnTxt}>Cancelar</Text>
                </TouchableOpacity>



                <TouchableOpacity style={styles.btnAddList} onPress={  addToList }>
                  <Text style={styles.btnTxt}>Adicionar</Text>
                </TouchableOpacity>

          </View>
      </View>
     }
      

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linear:{                              // configuração do linear gradient
    flex: 1,
    paddingTop: 50,
  },
  container: {                               //Container dentro do linear gradient na tela home
    alignItems: 'center',
    flex: 1,
  },

  header:{
    width: 100, 
    height: 100,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25

  },
  viewAdd:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  totalEntregas:{
    fontSize: 55,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  btnAdd:{
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
    fontSize: 20,
    position: 'relative',
    bottom: 1,
    color: 'white',
    textAlign: 'center',
  },
  btnAddList:{
    width: '30%',
    borderWidth: 3,
    borderRadius: 200,
    borderColor: '#00b894',
    marginHorizontal: 20
    
  },
  btnAddListCancel:{
    width: '30%',
    borderWidth: 1,
    borderRadius: 200,
    borderColor: '#ff7675',
    marginHorizontal: 20
    
  },

  flat:{                                  // View do flatList
    flexDirection: 'row',
    marginTop: 1,
    width: '100%',
    justifyContent: 'center',
    color: 'white',
  },

  endereço:{                              // Campo endereço dentro do flatList
    fontSize: 16,
    width: '88%',
    flexDirection: 'row',
    color: 'white',
    paddingLeft: 10
  },
  
  valorEntrega: {                          // Campo Valor da entrega dentro do flatList
    width: '12%',
    fontSize: 16,
    color: 'white',
  },
  input:{                                 // Campo input na tela Add
    borderBottomColor: '#dfe6e9',
    borderBottomWidth: 1,
    height: 50,
    width: '100%',
    fontSize: 19,
    color: 'white',
    marginVertical: 50
  },
  viewInput:{                              // View que ficam os campos de input na tela add
    width: '95%',
    marginBottom: 60,
    alignItems: 'center',
    marginBottom: 150,
    marginTop: -100,

  },
  date:{                              // Texto de data contido na parte de cima da tela
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },

});
