import axios from "axios";

export const setDataLimbah = (kodeKoneksi, tanggal) => (dispatch) => {
  axios
    .get(
      `https://aggressive-puce-dog.cyclic.cloud/v1/limbah/koneksi/${kodeKoneksi.value}/tgl_mulai/${tanggal.startDate}/tgl_akhir/${tanggal.endDate}`
    )
    .then((result) => {
      const responAPI = result.data;
      dispatch({
        type: "UPDATE_LIMBAH",
        payload: responAPI.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
