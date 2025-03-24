import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome_do_proprietario.value = onEdit.nome_do_proprietario;
      user.nome_do_pet.value = onEdit.nome_do_pet;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = ref.current;
  
    // Verificando se todos os campos estão preenchidos
    if (
      !user.nome_do_proprietario.value ||
      !user.nome_do_pet.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
  
    // Se for edição
    if (onEdit) {
      try {
        await axios
          .put("http://localhost:8800/" + onEdit.id, {
            nome_do_proprietario: user.nome_do_proprietario.value,
            nome_do_pet: user.nome_do_pet.value,
            fone: user.fone.value,
            data_nascimento: user.data_nascimento.value,
          })
          .then(({ data }) => toast.success(data));
        
        toast.success("Usuário atualizado com sucesso!");
  
      } catch ({ response }) {
        toast.error(response.data);
      }
    } else {
      // Se for criação
      try {
        await axios
          .post("http://localhost:8800", {
            nome_do_proprietario: user.nome_do_proprietario.value,
            nome_do_pet: user.nome_do_pet.value,
            fone: user.fone.value,
            data_nascimento: user.data_nascimento.value,
          })
          .then(({ data }) => toast.success(data));
  
        toast.success("Usuário cadastrado com sucesso!");
      } catch ({ response }) {
        toast.error(response.data);
      }
    }
  
    // Limpando os campos após submit
    user.nome_do_proprietario.value = "";
    user.nome_do_pet.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";
  
    // Resetando a edição
    setOnEdit(null);
    getUsers();
  };
  

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome do Proprietário</Label>
        <Input name="nome_do_proprietario" />
      </InputArea>
      <InputArea>
        <Label>Nome do Pet</Label>
        <Input name="nome_do_pet" type="nome_do_pet" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
