import React, { FC, useState, useEffect } from "react";
import { mumurlist } from "../../api/timeline";
import { userState } from "../../atoms/user";
import swal from "sweetalert";
import { useRecoilState } from "recoil";
import { 
  murmursResProps,
  mumurInputProps,
  murmursListProps 
} from "../../model";
import MurmurItem from '../../componets/Murmurs/Item'

const Timeline: FC = () => {
  const [error, setError] = useState<string>("");
  const [refresh, setRefresh] = useState<number>(0);
  const [murmurs, setMurmurs] = useState<murmursListProps[] | any>([]);

  const [user, ] = useRecoilState(userState);

  const getMurmurlist = async () => {

    const mumurInputs: mumurInputProps = {
      type: 'list',
      token: user.auth
    }
    const res: murmursResProps = await mumurlist(mumurInputs);

    if (res.error === true) {
      setError("Couldnt load data.");
    } else {
      setMurmurs(res?.data)
    }
  };

  const updateRefresh = () => setRefresh(refresh+1);

  useEffect(() => {
    if (error) {
      swal({
        title: "Some error occured",
        text: error,
        icon: "error",
      });
    }
    setError("");
  }, [error]);

  useEffect(() => {
    getMurmurlist();
  }, [refresh]);

  return (
    <div className="container">
      <div className="row">
        {
          murmurs && murmurs.map((murmur: murmursListProps, key: number) => (
            <div className="col-sm-4" key={key}>
              <MurmurItem
                murmur={murmur}
                userId={user.userId}
                updateRefresh={updateRefresh}
                token={user.auth}
              />
            </div>
          ))
        }
       </div>
    </div>
  );
};

export default Timeline;
