import React, { useState, useEffect } from "react";
import { Modal, Input, CardNode } from "../../component";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const DaftarNode = () => {
  const [perangkat, setPerangkat] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [koordinat, setKoordinat] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const resetState = () => {
    setIdUser("");
    setKode("");
    setNama("");
    setKoordinat("");
  };

  const cekFrom = () => {
    if (nama === "" || kode === "" || koordinat === "") {
      confirmAlert({
        title: "kesalahan",
        message: "data tidak boleh kosong",
        buttons: [
          {
            label: "Kembali",
          },
        ],
      });
      return false;
    }
  };

  useEffect(() => {
    tampilData();
  }, []);

  const tampilData = () => {
    axios
      .get("https://aggressive-puce-dog.cyclic.cloud/v1/perangkat")
      .then((result) => {
        setPerangkat(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataCari = async (e) => {
    try {
      if (e.target.value === "") {
        return tampilData();
      }
      const result = await axios.get(
        `https://aggressive-puce-dog.cyclic.cloud/v1/perangkat/perangkat/${e.target.value}`
      );
      setPerangkat(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapus = (id) => {
    confirmAlert({
      title: "Komfirmasi Hapus",
      message: "Apakah anda yakin ingin menghapus node ini ?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            axios
              .delete(
                `https://aggressive-puce-dog.cyclic.cloud/v1/perangkat/delete/${id}`
              )
              .then((res) => {
                tampilData();
              });
          },
        },
      ],
    });
  };

  const tambahData = () => {
    cekFrom();
    const newData = {
      nama: nama,
      kodeKoneksi: kode,
      lokasi: koordinat,
    };

    axios
      .post(
        "https://aggressive-puce-dog.cyclic.cloud/v1/perangkat/register",
        newData
      )
      .then((res) => {
        // Perbarui daftar perangkat dengan data baru
        tampilData();
        // Reset nilai input setelah berhasil menambahkan data
      })
      .catch((err) => {
        confirmAlert({
          title: "kesalahan",
          message: err.response.data.message,
          buttons: [
            {
              label: "Kembali",
            },
          ],
        });
      });
  };

  const tutupModal = () => {
    setOpenModal(false);
  };

  const tampilDataForm = (id) => {
    resetState();

    //panggil data dari useStatse perangkat
    const data = perangkat.find((item) => item._id === id);

    setIdUser(data._id);
    setKode(data.kodeKoneksi);
    setKoordinat(data.lokasi);
    setNama(data.nama);
    setOpenModal(true);
  };

  const editData = () => {
    const id = idUser;
    cekFrom();

    const newData = {
      kodeKoneksi: kode,
      lokasi: koordinat,
      nama: nama,
    };

    axios
      .put(
        `https://aggressive-puce-dog.cyclic.cloud/v1/perangkat/update/${id}`,
        newData
      )
      .then((res) => {
        console.log(res);
        tampilData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="w-full sm:w-auto">
          <div className="mx-5 my-5">
            <Modal
              title="Tambah Node"
              reset={resetState}
              tambahData={tambahData}
              bukaModal={openModal}
              tutupModal={tutupModal}
              edit={editData}
              dataModal={
                <div className="">
                  <div className="mb-3">
                    <Input
                      type="text"
                      id="kode"
                      title="Kode Node"
                      value={kode}
                      onChange={(e) => {
                        setKode(e.target.value);
                      }}
                    />
                    {kode === "" ? (
                      <span className="text-red-500 text-xs ">
                        Kode Node tidak boleh kosong
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-3">
                    <Input
                      type="text"
                      id="nama"
                      title="Nama"
                      value={nama}
                      onChange={(e) => {
                        setNama(e.target.value);
                      }}
                    />
                    {nama === "" ? (
                      <span className="text-red-500 text-xs ">
                        Nama tidak boleh kosong
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mb-3">
                    <Input
                      id="koordinat"
                      type="text"
                      title="Titik Koordinat"
                      placeholder="3.637681, 98.66637"
                      value={koordinat}
                      onChange={(e) => {
                        setKoordinat(e.target.value);
                      }}
                    />
                    {koordinat === "" ? (
                      <span className="text-red-500 text-xs ">
                        Koordinat tidak boleh kosong
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              }
            />
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <div className="mx-5 my-1 sm:my-5 border border-gray-400">
            <div className="flex rounded-md shadow-sm " role="group">
              <input
                type="text"
                className="rounded-md w-full"
                onChange={dataCari}
              />
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {perangkat && Array.isArray(perangkat) && perangkat.length > 0 ? (
          perangkat.map((data) => (
            <CardNode
              key={data._id}
              data={data}
              onDelete={hapus}
              onEdit={tampilDataForm}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default DaftarNode;
