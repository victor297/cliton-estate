import { useState, useEffect } from "react";

import env from "../../../env";
import { http } from "../axios-https";
import { toast } from "react-hot-toast";

const useGetOneProject = (projectId, reloadProp) => {
  const [loading, setLoading] = useState(false);
  const [projectDetail, setProjectDetail] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [project3DImages, setProject3DImages] = useState([]);
  const [projectVideos, setProjectVideos] = useState([]);
  const [projectUnits, setProjectUnits] = useState([]);

  const getOneProject = () => {
    setLoading(true);
    http
      .get(`${env.clinton_homes_base_url}/public/project/${projectId}`)
      .then((response) => {
        // console.log(response.data.data[0]["2D-ProjectImages"][0]);
        setProjectDetail([...response.data.data]);
        setProjectImages([...response.data.data[0]["2D-ProjectImages"]]);
        setProject3DImages([...response.data.data[0]["3D-ProjectImages"]]);
        setProjectVideos([...response.data.data[0]["videos"]]);
        setProjectUnits([...response.data.data[0].units]);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error);

        // console.log(error);
      });
  };

  useEffect(() => {
    getOneProject();
  }, [reloadProp]);

  return {
    loading,
    projectDetail,
    projectImages,
    project3DImages,
    projectVideos,
    projectUnits,
  };
};

export default useGetOneProject;
