import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Pressable,
    Modal,
    SafeAreaView,
  } from "react-native";
  import React, { useState } from "react";
  
  const TodoApp = () => {
    const [input, setInput] = useState("");
    const [todo, setTodo] = useState<string[]>([]);
    const [updateTodo, setUpdateTodo] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTodoIndex, setSelectedTodoIndex] = useState<number | null>(
      null
    );
  
    const addTodo = () => {
      todo.push(input);
      setTodo([...todo]);
      setInput("");
    };
  
    const handleDeleteTodo = (index: number) => {
      todo.splice(index, 1);
      setTodo([...todo]);
    };
  
    const openEditModal = (index: number) => {
      setSelectedTodoIndex(index);
      setUpdateTodo(todo[index]);
      setModalVisible(true);
    };
  
    const handleEditTodo = () => {
      if (selectedTodoIndex !== null) {
        todo[selectedTodoIndex] = updateTodo;
        setTodo([...todo]);
        setModalVisible(false);
      }
    };
  
    return (
      <>
        <View style={styles.container}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            TodoApp
          </Text>
  
          <TextInput
            placeholder="Enter todos"
            style={styles.input}
            value={input}
            onChangeText={setInput}
          />
  
          <TouchableOpacity style={styles.button} onPress={addTodo}>
            <Text>Add Todo</Text>
          </TouchableOpacity>
  
          {todo.length > 0 ? (
            <FlatList
              data={todo}
              renderItem={({ item, index }) => (
                <View key={index} style={{ marginVertical: 10 }}>
                  <Text>{item}</Text>
  
                  <TouchableOpacity onPress={() => handleDeleteTodo(index)}>
                    <Text
                      style={{
                        color: "red",
  
                        backgroundColor: "#870b13",
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        // width: 70,
                      }}
                    >
                      Delete Todo
                    </Text>
                  </TouchableOpacity>
  
                  <TouchableOpacity onPress={() => openEditModal(index)}>
                    <Text
                      style={{
                        // width: 80,
                        color: "blue",
                        backgroundColor: "#2196F3",
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                      }}
                    >
                      Edit Todo
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>No Todos Found</Text>
          )}
  
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Update Todo</Text>
                <TextInput
                  style={styles.updateInput}
                  onChangeText={setUpdateTodo}
                  value={updateTodo}
                />
                <Pressable
                  style={[styles.modalBtn, styles.buttonClose]}
                  onPress={handleEditTodo}
                >
                  <Text style={styles.textStyle}>Update Todo</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: "white",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
    },
    updateInput: {
      margin: 20,
      width: 200,
      borderWidth: 1,
      padding: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalBtn: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });
  
  export default TodoApp;