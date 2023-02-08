import { Axios } from "../helpers/axios.config";



export const listUsuarios = (_header) => {
 
  return Axios.get("usuarios", _header);
};

export const createUsuario = (data, _header) => {
  return Axios.post("usuarios/crear", data, _header);
};

export const deleteUsuario = (user, _header) => {
  return Axios.delete(`usuarios/${user}`, _header);
};

export const updateUsuario = (userLogin, data) => {
  return Axios.put(`usuarios/${userLogin}`, data);
};

export const getUsuario = (user, _header) => {
  return Axios.get(`usuarios/${user}`, _header);
};
