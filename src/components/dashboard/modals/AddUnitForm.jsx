import React, { useState, useCallback } from "react";

import { http, httpCloudinary } from "../../../app/services/axios-https";
import env from "../../../env";
import InputCommon from "../../inputField/InputCommon";
import ButtonCommon from "../../button/ButtonCommon";
import InputCommonWithIcon from "../../inputField/InputCommonWithIcon";
import Notification from "../../Notification";
import spinner from "../../../assets/common/spinner.svg";
import uploadButton from "../../../assets/common/upload.svg";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

import { useDispatch, useSelector } from "react-redux";
import {
  updateAddUnitData,
  clearAddUnitData,
} from "../../../features/units/addUnitSlice";

const AddUnitForm = ({ projectId, triggerReload }) => {
  const dispatch = useDispatch();
  const {
    unitName,
    noOfRooms,
    noOfBathrooms,
    price,
    paymentPlan,
    coverImageUrl,
  } = useSelector((state) => state.addUnitData);

  const [coverImage, setCoverImage] = useState(null);
  const [addingUnit, setAddingUnit] = useState(false);
  const [unitId, setUnitId] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setCoverImage(acceptedFiles[0]);

    const formdata = new FormData();
    formdata.append("file", acceptedFiles[0]);
    formdata.append("upload_preset", env.cloudinary_upload_preset);
    formdata.append("cloud_name", env.cloudinary_cloud_name);
    formdata.append("folder", "Cloudinary-ClintonDevs");

    httpCloudinary
      .post(
        `https://api.cloudinary.com/v1_1/${env.cloudinary_cloud_name}/image/upload`,
        formdata
      )
      .then((response) =>
        dispatch(updateAddUnitData({ coverImageUrl: response.data.url }))
      )
      .catch((error) =>
        toast.error(error.response.data.message || "Image upload error")
      );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const clearFields = () => {
    dispatch(clearAddUnitData());
    setCoverImage(null);
  };

  const addUnit = () => {
    setAddingUnit(true);
    const formdata = {
      name: unitName,
      numberOfBathRooms: parseInt(noOfBathrooms),
      paymentPlan: paymentPlan,
      image: coverImageUrl,
      numberOfRooms: parseInt(noOfRooms),
      price: parseInt(price),
    };
    http
      .post(
        `${env.clinton_homes_base_url}/admin/project/${projectId}/create-unit`,
        formdata
      )
      .then((response) => {
        toast.success("Unit Successfully Created");
        // console.log(response.data.data._id);
        setUnitId(response?.data?.data?._id);
        clearFields();
        triggerReload();
        setAddingUnit(false);
      })
      .catch((error) => {
        setAddingUnit(false);
        console.log(error);
        toast.error(error?.response?.data?.message || "An Error Occured");
      });
  };

  return (
    <div className="input-container">
      <Notification />
      <InputCommon
        placeholder="Name:"
        marginBottom="24px"
        value={unitName}
        onChange={(e) =>
          dispatch(updateAddUnitData({ unitName: e.target.value }))
        }
      />
      <InputCommon
        placeholder="Number of rooms:"
        marginBottom="24px"
        value={noOfRooms}
        onChange={(e) =>
          dispatch(updateAddUnitData({ noOfRooms: e.target.value }))
        }
      />
      <InputCommon
        placeholder="Number of bathrooms:"
        marginBottom="24px"
        value={noOfBathrooms}
        onChange={(e) =>
          dispatch(updateAddUnitData({ noOfBathrooms: e.target.value }))
        }
      />
      <InputCommon
        placeholder="Price:"
        marginBottom="24px"
        value={price}
        onChange={(e) => dispatch(updateAddUnitData({ price: e.target.value }))}
      />
      <select
        name=""
        id=""
        required
        value={paymentPlan}
        style={{
          width: "100%",
          height: "40px",
          borderRadius: "10px",
          paddingLeft: "10px",
          border: "none",
          background: "white",
        }}
        onChange={(e) =>
          dispatch(updateAddUnitData({ paymentPlan: e.target.value }))
        }
      >
        <option>Select plan</option>
        <option value="installmental">installmental</option>
        <option value="full">full</option>
      </select>
      {/* <InputCommon
        placeholder="Payment plan:"
        marginBottom="24px"
        value={paymentPlan}
        onChange={(e) =>
          dispatch(updateAddUnitData({ paymentPlan: e.target.value }))
        }
      /> */}

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <InputCommonWithIcon
            placeholder={coverImage ? coverImage.name : "Cover Image"}
            icon={uploadButton}
            marginBottom={"32px"}
            readOnly={true}
          />
        )}
      </div>
      <div style={{ textAlign: "end" }}>
        <ButtonCommon
          content={addingUnit ? <img src={spinner} /> : "Add"}
          backgroundColor="#F8F4F6"
          textColor="#721F4B"
          marginTop="16px"
          onClick={addUnit}
          width="20%"
        />
      </div>
    </div>
  );
};

export default AddUnitForm;
