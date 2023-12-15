import {useParams} from "react-router-dom";
import "./AnalystArticle.css";
import {useEffect, useState} from "react";
import {useUser} from "../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import {
  createAnalystArticle,
  deleteAnalystArticle,
  getAnalystArticleById,
  updateAnalystArticle,
} from "../../services/AnalystArticlesService";

type AnalystArticleProps = {};

function AnalystArticle(props: AnalystArticleProps) {
  const {analystArticleId} = useParams();
  const {user} = useUser();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"view" | "edit" | "new">("view");

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [authorName, setAuthorName] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");

  const handleAddAnalystArticleButton = async () => {
    if (!user || user.role !== "ANALYST") {
      alert("You must be an analyst to create an article");
      navigate("/home");
      return;
    }
    try {
      const article = await createAnalystArticle({
        title: title,
        authorId: user._id,
        authorName: user.fullName,
        text: text,
        date: date,
      });
      navigate(`/analyst-article/${article._id}`);
    } catch (error) {
      alert("Error creating article");
    }
  };

  const handleEditAnalystArticleButton = () => {
    if (!user || user.role !== "ANALYST") {
      alert("You must be an analyst to create an article");
      navigate("/home");
      return;
    }
    if (user._id !== authorId) {
      alert("You can only edit your own articles");
      return;
    }
    setMode("edit");
  };

  const handleDeleteAnalystArticleButton = async () => {
    if (!user || user.role === "USER") {
      alert("You must be an analyst or admin to delete an article");
      navigate("/home");
      return;
    }
    if (user.role !== "ADMIN") {
      if (user._id !== authorId) {
        alert("You can only edit your own articles");
        return;
      }
    }
    try {
      navigate("/account/" + user._id);
      await deleteAnalystArticle(analystArticleId ? analystArticleId : "");
    } catch (error) {
      alert("Error deleting article");
    }
  };

  const handleSaveAnalystArticleButton = async () => {
    if (!user || user.role !== "ANALYST") {
      alert("You must be an analyst to save an article");
      navigate("/home");
      return;
    }
    try {
      if (!analystArticleId || analystArticleId === "new") {
        alert("Incorrect URL");
        navigate("/home");
        return;
      }
      if (user._id !== authorId) {
        alert("You can only edit your own articles");
        return;
      }
      const article = await updateAnalystArticle(analystArticleId, {
        title: title,
        text: text,
      });
      navigate(`/analyst-article/${article._id}`);
      setMode("view");
    } catch (error) {
      alert("Error updating article");
    }
  };

  useEffect(() => {
    const loadArticle = async () => {
      try {
        if (!analystArticleId || analystArticleId === "new") {
          alert("Incorrect URL");
          navigate("/home");
          return;
        }
        const article = await getAnalystArticleById(analystArticleId);
        setTitle(article.title);
        setText(article.text);
        setDate(new Date(article.date));
        setAuthorId(article.authorId);
        setAuthorName(article.authorName);
      } catch (error) {
        alert("Error finding article");
        navigate("/home");
      }
    };

    if (analystArticleId && analystArticleId === "new") {
      if (!user || user.role !== "ANALYST") {
        navigate("/home");
        return;
      }
      setMode("new");
    }
    if (!analystArticleId) {
      alert("Incorrect URL");
      navigate("/home");
    }
    if (analystArticleId && analystArticleId !== "new" && mode !== "edit") {
      loadArticle();
      setMode("view");
    }
  }, [analystArticleId, user, navigate]);
  return (
    <>
      {mode === "view" && (
        <div className='page pt-3 w-75'>
          <h1>{title}</h1>
          <div><strong>By:</strong> {authorName}</div>
          <p> <strong> Published: </strong> {date.toLocaleDateString()}</p>
          <hr />
          <p>{text}</p>
          {user && user.role === "ANALYST" && (
            <button
              className='btn btn-outline-dark me-3'
              onClick={handleEditAnalystArticleButton}
            >
              Edit Article
            </button>
          )}
          {user && user.role !== "USER" && (
            <button
            className='btn btn-outline-danger'
            onClick={handleDeleteAnalystArticleButton}
          >
            Delete Article
          </button>
          )}
        </div>
      )}

      {mode === "edit" && (
        <div className='page'>
          <h1>Analyst Article</h1>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            className='form-control w-50'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='text'>Text</label>
          <textarea
            id='text'
            className='form-control w-75'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className='btn btn-outline-dark mt-3'
            onClick={handleSaveAnalystArticleButton}
          >
            Save Article
          </button>
        </div>
      )}

      {mode === "new" && (
        <div className='page analyst-article'>
          <h1>Analyst Article</h1>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            className='form-control w-50'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='text'>Text</label>
          <textarea
            id='text'
            className='form-control'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className='btn btn-outline-dark mt-3'
            onClick={handleAddAnalystArticleButton}
          >
            Add Article
          </button>
        </div>
      )}
    </>
  );
}

export default AnalystArticle;
