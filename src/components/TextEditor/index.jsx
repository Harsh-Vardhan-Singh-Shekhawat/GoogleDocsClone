import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { firestore } from "../../firebase/config";

const TextEditor = ({ uid, id }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "userDocs", `${uid}`, "docs", `${id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap?.data()?.editorState)
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(docSnap.data()?.editorState)
            )
          );
      }
    };
    fetchData();
  }, [uid, id]);
  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <Editor
        
        editorState={editorState}
        onEditorStateChange={(e) => {
          setEditorState(e);
          const docRef = doc(firestore, "userDocs", `${uid}`, "docs", `${id}`);
          setDoc(
            docRef,
            {
              editorState: convertToRaw(editorState.getCurrentContent()),
            },
            { merge: true },
            (doc) => console.log(doc)
          );
        }}
        placeholder="Type @ to insert"
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto !border-0 !border-b-2 !border-[#ccc] shadow-md"
        editorClassName="mt-6 bg-white border border-gray-400 p-14 shadow-lg  min-h-[1300px] max-w-5xl border-3 mx-auto mb-12 rounded-sm "
        editorStyle={{ minHeight: "1200px", minWidth: "800px" }}
      />
      
    </div>
  );
};

export default TextEditor;
