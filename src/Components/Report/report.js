import React, {Component} from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import {saveAs} from "file-saver";
import DocxGen from "react-docgen";

function Report() {
  function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
  }

  const generateDocument = () => {
    // loadFile("http://localhost:3000/api/v1/image/loop-table.docx",function(err,content){
    //
    //   var doc = new DocxGen(content)
    //   doc.setData({
    //     "data":[{
    //       "_id":"DC2",
    //       "name":"Doe",
    //       "age":"12"
    //     },{
    //       "_id":"DC1",
    //       "name":"Doe",
    //       "age":"22"
    //     }]});
    //   doc.render()
    //   var out = doc.getZip().generate({
    //     type: "blob",
    //     mimeType:
    //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    //   });
    //   saveAs(out, "output.docx");
    // });

    // loadFile("@src/Components/Report/loop-table.docx", function (error, content) {
    loadFile("http://qlbts.thinklabs.com.vn/api/v1/image/1617944161.pdf", function (error, content) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new Docxtemplater().loadZip(zip);
      doc.setData({
        "data": [
          {_id: 1, name: 'Le Van Hai Bien', age: 22},
          {_id: 2, name: 'Nguyen Van Cuong', age: 25},
          {_id: 3, name: 'Nguyen The Quyet', age: 27}
        ]
      });
      try {
        doc.render();
      } catch (error) {
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (
              error,
              key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
          }
          return value;
        }

        console.log(JSON.stringify({error: error}, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function (error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
        }
        throw error;
      }
      var out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      saveAs(out, "output.docx");
    });

  };

  return (
    <div className="p-2">
      <button onClick={generateDocument}>Generate document</button>
    </div>
  );
}

export default Report;
