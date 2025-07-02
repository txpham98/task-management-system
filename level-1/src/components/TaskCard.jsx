export default function TaskCard(props) {
    return (
        <div className="task-card-container">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
}