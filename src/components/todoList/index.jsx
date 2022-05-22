
import axios from "axios"
import { useEffect, useState } from "react"
import { ListGroup, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteItem, dragItem, getTodos, setSelectedItem } from "../../features/todos/todoSlise"
import Badge from 'react-bootstrap/Badge'
import { buildTree } from "../../utils"

const List = () => {
    const dispath = useDispatch()
    const { todos: treeTodos, selectedItem } = useSelector((state) => state.todos)

    const [renderTreeResult, setRenderTreeResult] = useState(null)


    let contentDrop = null

    const onDragStartHandler = (e, node) => {
        e.stopPropagation()
        contentDrop = node
    }

    // const onDragEndHandler = (e) => {

    // }

    const onDragOverHandler = (e, node) => {
        e.preventDefault()
        e.stopPropagation()

    }

    const onDragLeaveHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()


    }

    const onDropHandler = (e, node) => {
        e.preventDefault();
        e.stopPropagation();

        if (node && contentDrop) {
            dispath(dragItem({ nodeId: contentDrop.id, newParentId: node.content.startsWith('element') ? node.id : node.parentId }))
        }

    }

    useEffect(() => {
        dispath(getTodos())
    }, [])

    useEffect(() => {
        if (treeTodos) {
            setRenderTreeResult(renderTree(treeTodos))
        }

    }, [treeTodos])


    function renderTree(data) {
        const nodes = data.filter((item) => item.content.startsWith('element'));

        const tree = nodes.map((node) => {
            return {
                ...node,
                children: data.filter((sub) => sub.parentId && sub.parentId === node.id)
            }
        });


        const render = (tree) => {
            return tree && tree.map((node) => {
                const { children, ...rest } = node;
                return (
                    <ul key={rest.id}
                    >

                        <li style={{ border: '1px solid blue', marginBottom: '3px' }} onClick={() => dispath(setSelectedItem(rest))}
                            draggable={true}
                            onDragOver={(e) => { onDragOverHandler(e, node) }}
                            onDragLeave={(e) => { onDragLeaveHandler(e) }}
                            onDragStart={(e) => { onDragStartHandler(e, node) }}
                            // onDragEnd={(e) => { onDragEndHandler(e) }}
                            onDrop={(e) => { onDropHandler(e, node) }}
                        >{node.content}</li>
                        {children?.length ? render(children) : <></>}
                    </ul>
                )
            })

        }

        return render(tree);
    }

    return (
        <div className="container bg-light border pt-3 " style={{ borderRadius: '10px' }}>

            <div className="d-flex justify-content-around  " >
                <div className="border border-primary " style={{ width: '400px', height: '500px', overflowY: 'scroll', cursor: 'grab' }}  >
                    <ListGroup variant="flush"  >

                        {renderTreeResult}

                    </ListGroup>
                </div>
                <div className="border border-primary" style={{ width: '300px', height: '500px' }}>
                    <ListGroup variant="flush">
                        {selectedItem ?
                            <div >
                                <div style={{ border: '1px solid blue', marginBottom: '3px' }}> Id: {selectedItem.id} </div>
                                <div style={{ border: '1px solid blue', marginBottom: '3px' }}> ParentId: {selectedItem.parentId} </div>
                                <div style={{ border: '1px solid blue', marginBottom: '3px' }}> Label: {selectedItem.content} </div>
                            </div > : <p style={{ alignItem: 'center' }}>No items selected </p>}

                    </ListGroup>
                </div>
            </div>
            <div className=" d-flex justify-content-end mb-3 pt-3 gap-2">
                <Button variant="primary" size="sm" type="submit" onClick={() => dispath(getTodos())}>
                    Refrech
                </Button>
                <Button variant="primary" size="sm" disabled={!selectedItem} onClick={() => dispath(deleteItem())} >
                    Delete
                </Button>
                <Button variant="primary" size="sm" onClick={() => console.log(treeTodos, 'curent tree')} >
                    apply
                </Button>
            </div>
        </div >
    )
}

export default List