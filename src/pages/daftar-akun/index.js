import React, { useState, useEffect } from "react";
import { Modal, Input, Pilih, Card } from "../../component";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const DaftarAkun = () => {
  const [dataAkun, setDataAkun] = useState([]);
  const [dataNode, setDataNode] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [idUser, setIdUser] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [hakAkses, setHakAkses] = useState("");
  const [node, setNode] = useState([]);
  const [password, setPassword] = useState("");
  const [passKom, setPasswordKom] = useState(false);

  const tutupModal = () => {
    setOpenModal(false);
  };

  const resetState = () => {
    setIdUser("");
    setUsername("");
    setEmail("");
    setHakAkses("");
    setNode([]);
    setPassword("");
    setPasswordKom("");
  };

  const cekFrom = () => {
    if (
      username === "" ||
      password === "" ||
      passKom === "" ||
      hakAkses === "" ||
      node === ""
    ) {
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

  const dataHakAkses = [
    {
      value: "provinsi",
      label: "Provinsi",
    },
    {
      value: "madya",
      label: "Madya",
    },
    {
      value: "industri",
      label: "Industri",
    },
  ];

  useEffect(() => {
    tampilData();

    axios
      .get("http://localhost:4000/v1/perangkat")
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
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tampilData = () => {
    axios
      .get("http://localhost:4000/v1/akun")
      .then((result) => {
        setDataAkun(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hapus = (id) => {
    confirmAlert({
      title: "Hapus Pengguna",
      message: "Apakah anda yakin ingin menghapus pengguna ini ?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            axios
              .delete(`http://localhost:4000/v1/akun/delete/${id}`)
              .then((res) => {
                tampilData();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ],
    });
  };

  const tambahData = () => {
    cekFrom();

    const newData = {
      username: username,
      email: email,
      hakAkses: hakAkses,
      password: password,
      node: node,
    };
    axios
      .post("http://localhost:4000/v1/akun/register", newData)
      .then((res) => {
        // Perbarui daftar perangkat dengan data baru
        tampilData();
        // Reset nilai input setelah berhasil menambahkan data
      })
      .catch((err) => {
        console.log(err);

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

  const dataCari = async (e) => {
    try {
      if (e.target.value === "") {
        return tampilData();
      }
      const result = await axios.get(
        `http://localhost:4000/v1/akun/akun/${e.target.value}`
      );
      setDataAkun(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tampilDataForm = (id) => {
    resetState();

    //panggil data dari useStatse perangkat
    const data = dataAkun.find((item) => item._id === id);

    setIdUser(data._id);
    setUsername(data.username);
    setEmail(data.email);
    setHakAkses([
      {
        value: data.hakAkses,
        label: data.hakAkses,
      },
    ]);

    setNode(data.node);
    setOpenModal(true);
  };

  const editData = () => {
    const id = idUser;
    const newData = {
      username: username,
      email: email,
      hakAkses: hakAkses[0].value,
      password: password,
      node: node,
    };

    if (newData.password === "") {
      delete newData.password;
    }

    axios
      .put(`http://localhost:4000/v1/akun/update/${id}`, newData)
      .then((res) => {
        tampilData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHakAksesChange = (selectedValues) => {
    setHakAkses(selectedValues.value);
    if (selectedValues.value === "provinsi") {
      setNode([]);
      handleNodeChange([
        {
          value: "semua",
          label: "Semua Node",
        },
      ]);
    }

    if (selectedValues.value === "industri") {
      setNode([]);
    }
  };

  const handleNodeChange = (selectedValues) => {
    hakAkses === "industri"
      ? setNode([selectedValues])
      : setNode(selectedValues);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="w-full sm:w-auto">
          <div className="mx-5 my-5">
            <Modal
              title="Tambah Akun"
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
                      id="username"
                      title="Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    {username === "" ? (
                      <span className="text-red-500 text-xs ">
                        Username tidak boleh kosong
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <Input
                    type="email"
                    title="Email"
                    optional="(optional)"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Pilih
                    title="Hak Akses"
                    arrayData={dataHakAkses}
                    value={hakAkses}
                    data={handleHakAksesChange}
                  />
                  <Pilih
                    title="Daftar Node"
                    arrayData={dataNode}
                    value={node}
                    data={handleNodeChange}
                    hakAkses={hakAkses}
                  />

                  <div className="mb-3">
                    <Input
                      type="password"
                      title="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    {password === "" ? (
                      <span className="text-red-500 text-xs ">
                        Password tidak boleh kosong
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mb-3">
                    <Input
                      type="password"
                      title="Komfirmasi Password"
                      onChange={(e) => {
                        if (e.target.value === password) {
                          setPasswordKom(true);
                        } else {
                          setPasswordKom(false);
                        }
                      }}
                    />
                  </div>
                  {passKom === false ? (
                    <span className="text-red-500 text-xs ">
                      Password dan Komfirmasi Password Harus Sama
                    </span>
                  ) : (
                    ""
                  )}
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
        {dataAkun && Array.isArray(dataAkun) && dataAkun.length > 0 ? (
          dataAkun.map((data) => (
            <Card
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

export default DaftarAkun;
