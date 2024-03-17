import { useState, useEffect } from "react";

import env from "../../../env";
import { http } from "../axios-https";
import { toast } from "react-hot-toast";

const useGetAllProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);

  const getAllProjects = () => {
    setLoading(true);
    http
      .get(`${env.clinton_homes_base_url}/public/projects`)
      .then((response) => {
        // console.log(response.data.data);
        setProjectList([...response.data.data]);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error);
      });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return { loading, projectList };
};

export default useGetAllProjects;
