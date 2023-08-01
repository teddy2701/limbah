import React, { useEffect, useState } from "react";
import {
  DataVolume,
  PilihData,
  TampilDataLimbah,
  NilaiNH,
  NilaiPh,
  NilaiCOD,
  NilaiTTS,
  Peringatan,
} from "../../component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDataLimbah } from "../../config/redux/action/limbahAction";
import { setPeringatan } from "../../config/redux/action/peringatanAction";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataNode, setDataNode] = useState([]);
  const { dataLimbah } = useSelector((state) => state.limbahReducer);
  const { dataPeringatan } = useSelector((state) => state.peringatanReducer);
  const { userData } = useSelector((state) => state.loginReducer);
  const [selectedNode, setSelectedNode] = useState({});
  const [tanggal, setTanggal] = useState({});

  const nodePilihan = (node, tanggal) => {
    setSelectedNode(node);
    setTanggal(tanggal);
  };

  const calculateAverage = (data) => {
    if (!data || data.length === 0) {
      return {
        NH3N: 0,
        COD: 0,
        PH: 0,
        TTS: 0,
      };
    }

    const sum = data.reduce(
      (acc, item) => ({
        NH3N: acc.NH3N + (item.NH3N || 0),
        COD: acc.COD + (item.COD || 0),
        PH: acc.PH + (item.PH || 0),
        TTS: acc.TTS + (item.TTS || 0),
      }),
      { NH3N: 0, COD: 0, PH: 0, TTS: 0 }
    );

    const numItems = data.length;
    return {
      NH3N: sum.NH3N / numItems,
      COD: sum.COD / numItems,
      PH: sum.PH / numItems,
      TTS: sum.TTS / numItems,
    };
  };

  const dataGrafik = (data, limbahParameter) => {
    if (!data || data.length === 0) {
      return [];
    }

    const formattedData = data.map((item) => ({
      [limbahParameter]: item[limbahParameter] || 0,
      date: new Date(item.tanggal).toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
    return formattedData;
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(setDataLimbah(selectedNode, tanggal));
      dispatch(setPeringatan(selectedNode, tanggal));
    };

    // Panggil fetchData awal saat komponen pertama kali dirender
    fetchData();
    // Jalankan fetchData setiap 5 detik menggunakan setInterval
    const intervalId = setInterval(fetchData, 5000);

    // Membersihkan interval ketika komponen di-unmount
    return () => clearInterval(intervalId);
  }, [selectedNode, tanggal]);

  useEffect(() => {
    if (!userData || !userData.node || userData.node.length === 0) {
      navigate("/login");
      return;
    }

    if (userData.node[0].value === "semua") {
      axios
        .get("https://aggressive-puce-dog.cyclic.cloud/v1/perangkat")
        .then((result) => {
          const hasil = result.data.data;
          const ubah = hasil.map((index) => {
            return {
              value: index.kodeKoneksi,
              label: index.nama,
              lokasi: index.lokasi,
            };
          });
          setDataNode(ubah);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDataNode(userData.node);
    }
  }, [userData]);

  return (
    <div>
      {dataNode.length > 0 && (
        <PilihData option={dataNode} node={nodePilihan} />
      )}
      <div className="grid grid-cols-2">
        <TampilDataLimbah rataRataLimbah={calculateAverage(dataLimbah)} />

        {dataNode.length > 0 && (
          <DataVolume
            data={dataGrafik(dataLimbah, "Volume")}
            option={selectedNode}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <NilaiNH data={dataGrafik(dataLimbah, "NH3N")} />
        <NilaiCOD data={dataGrafik(dataLimbah, "COD")} />
        <NilaiPh data={dataGrafik(dataLimbah, "PH")} />
        <NilaiTTS data={dataGrafik(dataLimbah, "TTS")} />
      </div>
      <Peringatan data={dataPeringatan} />
    </div>
  );
};

export default Home;
