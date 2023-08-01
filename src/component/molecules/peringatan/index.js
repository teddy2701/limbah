import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const Peringatan = (props) => {
  const { data } = props;

  const TABLE_HEAD = ["No", "Nama Node", "Tanggal", "Waktu", "Keterangan"];

  const TABLE_ROWS = data.map((index) => ({
    nama: index.nama,
    tanggal: new Date(index.tanggal).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    waktu: new Date(index.tanggal).toLocaleString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    keterangan: index.keterangan,
  }));
  return (
    <div className="mx-2 my-2 py-2 px-2 ">
      <p className="text-black text-base font-bold md:text-xl ">Peringatan</p>
      <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ nama, tanggal, waktu, keterangan }, index) => {
              const nomor = index + 1;
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={nama}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {nomor}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {nama}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {tanggal}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {waktu}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {keterangan}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Peringatan;
