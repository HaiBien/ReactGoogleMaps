import React, {useState} from 'react';

function View() {
  const [data, setData] = useState([
    {
      TenGP: 'GP1',
      NgayCap: '11/4/1999',
      file: [{
        name: 'GIAY_PHEP 1',
        age: 'https://s3.jp-tok.cloud-object-storage.appdomain.cloud/thinklabs-tradar-qlbts/Bts.xlsx'
      },]
    },
    {
      TenGP: 'GP2',
      NgayCap: '11/7/2000',
      file: [
        {
          name: 'GIAY_PHEP 2',
          age: 'https://s3.jp-tok.cloud-object-storage.appdomain.cloud/thinklabs-tradar-qlbts/importBts.xlsx'
        },
        {
          name: 'GIAY_PHEP 3',
          age: 'https://s3.jp-tok.cloud-object-storage.appdomain.cloud/thinklabs-tradar-qlbts/importBts.xlsx'
        },
      ]
    },

  ])
  const ThanhPho = [
    {
      phuong: ""
    },
    {
      phuong: ''
    }
  ]
  function renderView(input) {
    return (
      <>
        {input.map((i, index) => (
          <row key={index}>
            <a href={i.age} target="_blank" rel="noopener noreferrer">
              <div>{i.name} </div>
            </a>
          </row>
        ))}
      </>
    )
  }

  return (
    <>
      <table>
        <tr>
          <th>Tên giấy phép</th>
          <th>Ngày cấp</th>
          <th>File</th>
        </tr>
        <tbody>
        {data.map((i, index) => (
          <tr key={index}>
            <td>{i.TenGP}</td>
            <td>{i.NgayCap}</td>
            <td>{renderView(i.file)}</td>
          </tr>
        ))}
        </tbody>
      </table>


    </>
  )
}

export default View;
