import { Axios } from "../helpers/axios.config";

export const listCiudadanos = (_header) => {
  return Axios.get("contactos", _header);
};

export const createCiudadano = (data) => {
  return Axios.post("contactos/crear", data);
};

export const deleteCiudadano = (identification) => {
  return Axios.delete(`contactos/${identification}`);
};

export const updateCiudadano = (identification, data) =>{
  return Axios.put(`contactos/${identification}`, data);
}

export const getCiudadano = (documentoId) => {
  return Axios.get(`contactos/${documentoId}`);
};