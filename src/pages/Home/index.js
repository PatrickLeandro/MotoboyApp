import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons,Ionicons  } from '@expo/vector-icons';

import Menu from '../../components/Menu';
import Slider from '@react-native-community/slider'

const datas = [] // array que conterá as informações das entregas para testes pegue as informações do comentário abaixo e coloque dentro do array;

/*
{
  id: "1", date: "22/03/2021", endereço: "Tereza Machado, 121", valorEntrega: 3, 
},

{ 
  id: "2", date: "22/03/2021", endereço: "Guanahani , 181", valorEntrega: 5, 
},

{
  id: "3", date: "22/03/2021", endereço: "João Batista Soares de Queiroz Jr, 1354", valorEntrega: 1, 
},

{
  id: "4", date: "22/03/2021", endereço: "Osaka, 38", valorEntrega: 8, 
},

{
  id: "5", date: "22/03/2021", endereço: "Tereza de Jesus Silva, 466", valorEntrega: 8, 
},
*/

export default function index() {

  const [total, setTotal] = useState(40);

  const [ data, setData ] = useState([]);

  const [endereco, setEndereco] = useState('')  // constante com valor de endereço, sera recebida pelo input na tela add
  const [valorTaxa, setValorTaxa] = useState(3) // constante com valor da taxa, sera recebida pelo input na tela add
  const [pageApp, setPageApp] = useState(true) // constante condicional que ao ser mudada para false renderiza a tela de adicionar entrega
  const [contadorEntregas, setContadorEntregas] = useState(0) //constante que conta o número de entregas feitas
  const [diaria, setDiaria] = useState(40) //constante que controla a diaria



  var contadorDiaria = () => {
     setDiaria(diaria+5);
     if (diaria >= 100) {
       setDiaria(30);
    }
  }

  


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

     if (endereco == ''){
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
      setValorTaxa(3);                                   // retornar o valor inicial de taxa
      setPageApp(true)                                    // retorna o valor de page app e volta para a tela inicial
      setContadorEntregas(contadorEntregas + 1)           // Soma mais uma entrega realizada

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
      <TouchableOpacity onPress={contadorDiaria}>
                <Text style={styles.date}>{ getCurrentDate() }</Text> 
      </TouchableOpacity>
      {/* A função chamada através deste text retorna a data atual no formato (diaDaSemana - dd/mm/aaaa )*/}
      

      { pageApp ?  //#################  Condicional para Page HOME ou Page ADD ENTREGA  ################# 
      
      
      //#################  Abaixo page HOME ################# 
        <View style={styles.container}>
          <Menu />
            <View style={styles.header}>
                    <Text style={styles.totalEntregas}>{ total+diaria }</Text>
            </View>

            <FlatList 
              data = { data }
              renderItem = { renderItem }
              keyExtractor = { item => item.id }
            />

            <TouchableOpacity style={styles.btnAdd} onPress={  pageAdd }>
            <Ionicons name="add" size={40} color="white" />
            </TouchableOpacity>

            <View style={styles.fechamento}>
                  <Text style={styles.entregasRealizadas}> {contadorEntregas} - Entregas realizadas</Text>
                  <Text style={styles.entregasRealizadas}> Valor total das entregas:   R$ {total},00</Text>
                  <Text style={styles.entregasRealizadas}> Valor da diária   R$ {diaria},00</Text>
                  <Text style={styles.entregasRealizadas}> Fechamento previsto:   R$ {total+diaria },00</Text>
            </View>
        </View> 
        
        
        :      //#################  Abaixo page Adicionar entrega  ################# 

    
      <View style={styles.containerAdd}>
          


          <View style={styles.viewInput}>
            <TextInput          // este input solicita o endereço ou número da comanda
              style={styles.input}
              value={endereco}
              onChangeText={(valor) => setEndereco(valor)}
              placeholder="Comanda ou endereço"
              placeholderTextColor='#b2bec3'
            />



            <View style={styles.viewSlider}>
              <Text style={styles.txtSlider}>Valor da taxa R$ {valorTaxa},00</Text>


              <Slider 
                style={{height: 50,}}
                minimumValue={1}
                maximumValue={20}
                value={valorTaxa}
                onValueChange={(valor)=>setValorTaxa(valor.toFixed(0)) }
                maximumTrackTintColor='#FFFFFF'
                thumbTintColor='#FFFFFF'
              />
            </View>

            
            
          </View>

          <View style={styles.viewBtn}>

                <TouchableOpacity style={styles.btnAddListCancel} onPress={  cancel }>
                  <Text style={styles.btnTxt}>Cancelar</Text>
                </TouchableOpacity>
                {/* Acima botão de cancelar caso o usuário não queira adicionar nenhuma entrega */}



                <TouchableOpacity style={styles.btnAddList} onPress={  addToList }>
                  <Text style={styles.btnTxt}>Adicionar</Text>
                </TouchableOpacity>
                {/* Acima botão para adicionar entrega, a função chamada verifica se os campos foram preenchidos */}

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

  header:{                               //header da page home
    width: 100, 
    height: 100,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25

  },
  containerAdd:{                               //View container da tela add
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn:{                               // View de botões na tela add
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  totalEntregas:{                               // text com total de entregas tela HOME
    fontSize: 55,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  btnAdd:{                               //botão para adicionar uma nova entrega na tela HOME
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
    zIndex: 9999999
  },

  btnTxt:{                               //textos de todos os botões
    fontSize: 20,
    position: 'relative',
    bottom: 1,
    color: 'white',
    textAlign: 'center',
  },

  btnAddList:{                               //Botão de adicionar na tela add
    width: '30%',
    borderWidth: 3,
    borderRadius: 200,
    borderColor: '#00b894',
    marginHorizontal: 20
    
  },
  btnAddListCancel:{                               //Botão de cancelar na tela add
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
    alignItems: 'center',
    marginBottom: 150,
    marginTop: -30,

  },
  date:{                              // Texto de data contido na parte de cima da tela
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  fechamento:{
    width: '68%',
    marginRight: '30%',
    height: 100,
    zIndex: 1
  },
  entregasRealizadas: {
    fontSize: 16,
    textAlign: 'left',
    color: 'white',
  },
  viewSlider:{
    width: '95%',
    marginTop: 50,
    
  },
  txtSlider:{
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },

});
