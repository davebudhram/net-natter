import {IAnalystArticle} from "../../interfaces/analystArticle";
import "./analystArticleCard.css";
import {useNavigate} from "react-router-dom";

type AnalystArticleCardProps = {
  article: IAnalystArticle;
};
function AnalystArticleCard(props: AnalystArticleCardProps) {
  const {article} = props;
  const navigate = useNavigate();

  return (
    <div
      className='analyst-article-card p-3'
      onClick={() => navigate(`/analyst-article/${article._id}`)}
    >
      <h3>{article.title}</h3>
      <div>
        <strong>Author:</strong> {article.authorName}
      </div>
      <div>
        {" "}
        <strong>Published:</strong>{" "}
        {new Date(article.date).toLocaleDateString()}
      </div>
    </div>
  );
}

export default AnalystArticleCard;
