import axios from "axios";

export const setPeringatan = (kodeKoneksi, tanggal) => (dispatch) => {
  axios
    .get(
      `http://localhost:4000/v1/peringatan/koneksi/${kodeKoneksi.value}/tgl_mulai/${tanggal.startDate}/tgl_akhir/${tanggal.endDate}`
    )
    .then((result) => {
      const responAPI = result.data;
      dispatch({
        type: "UPDATE_PERINGATAN",
        payload: responAPI.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
