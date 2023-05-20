import Icon from "@material-tailwind/react/Icon";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
  MdLockOutline,
  MdOutlineInsertComment,
  MdOutlineCloudDone,
} from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";
import { BiFolderMinus } from "react-icons/bi";
import StateToPdfMake from "draft-js-export-pdfmake";
import TextEditor from "../../components/TextEditor";
import { AuthContext } from "../../context/firebase";
import { useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { auth, firestore } from "../../firebase/config";
import { doc, getDoc } from "@firebase/firestore";
import { useState } from "react";

const Editor = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);
  const [isHovering, seeIsHovering] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  // const showDropdown = () => {
  //   return (
  //    <Drawer />
  //   )
  // }

  if (user === null) history.push("/");

  useEffect(() => {
    const getUerDoc = async () => {
      const docRef = doc(
        firestore,
        "userDocs",
        `${user?.uid}`,
        "docs",
        `${id}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserDoc(docSnap.data());
      else history.push("/");
    };
    getUerDoc();
  }, [id, user?.uid, history]);

  return (
    <>
      <header className="flex justify-between items-center px-3 pt-1 pb-1">
        <span className="cursor-pointer">
          <Link to="/">
            <Icon name="description" color="blue" size="5xl" />
          </Link>
        </span>
        <div className="flex-grow px-2">
          <div className=" flex ">
            <h2 className="text-lg font-normal text-gray-800">
              {userDoc?.name}
            </h2>
            <div className="flex mt-2 mx-3">
              <AiOutlineStar className="mx-1.5 hover:bg-gray-100 hover:rounded-full hover:w-10 cursor-pointer" />
              <BiFolderMinus className="mx-1.5 cursor-pointer" />
              <MdOutlineCloudDone className="mx-1.5 cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center overflow-x-scroll text-sm space-x-1 ml-1 text-gray-600">
            <p className=" text-black cursor-pointer ml-0">File</p>
            <p className="options">Edit</p>
            <p className="options">View</p>
            <p className="options">Insert</p>
            <p className="options">Format</p>
            <p className="options">Tools</p>
            <p className="options">Extensions</p>
            <p className="options">Help</p>
          </div>
        </div>
        <button className="bg-transparent hover:bg-transparent-500 b-0">
          <RiHistoryFill
            fontSize={26}
            className=" mx-3 text-gray-800 hover:bg-gray-200 hover:"
          />
        </button>
        <button>
          <MdOutlineInsertComment
            fontSize={26}
            className="mx-3 text-gray-800"
          />
        </button>
        <button
          size="regular"
          style={{ background: "#c2e7ff", color: "#001d35" }}
          className="rounded-full mx-2 w-28 !bg-[#c2e7ff] hover:bg-black  md:inline-flex h-10"
          onClick={() => {
            const stateToPdfMake = new StateToPdfMake(userDoc?.editorState);
            // console.log(stateToPdfMake.generate());
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake
              .createPdf(stateToPdfMake.generate())
              .download(`${userDoc?.name}.pdf`);
          }}
        >
          <MdLockOutline className="mt-2.5 ml-4" fontSize={18} />
          <span className="text-center mt-2 mx-3">Share</span>
        </button>
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          title={user?.displayName}
          onClick={() => {
            signOut(auth);
            setUser(null);
          }}
          className="cursor-pointer rounded-full h-10 w-10 mx-3 "
        />
      </header>
      <TextEditor uid={user?.uid} id={id} />
    </>
  );
};

export default Editor;
