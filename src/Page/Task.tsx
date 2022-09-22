import React, { useState, CSSProperties, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, ResponderProvided, DropResult, DraggingStyle } from "react-beautiful-dnd";
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';

interface ItemProps {
    id: string;
    content: string;
}

const TaskDragDrop = () => {
    const history = useHistory();
    const [itemsState, setItemsState] = useState<ItemProps[]>([]);

    const getItems = (count: number) => {
        return Array.from({ length: count }, (v, k) => k).map((k): ItemProps => {
            return {
                id: `item-${k}`,
                content: `item ${k}`
            }
        });
    }

    useEffect(() => {
        setItemsState(getItems(5))
    }, [history])

    // a little function to help us with reordering the result
    const reorder = (list: ItemProps[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const grid = 10;

    const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle): CSSProperties => {
        return {
            // some basic styles to make the items look a bit nicer
            userSelect: "none",
            padding: 40,
            margin: `0 0 ${grid}px 0`,
            background: isDragging ? '#000' : "grey", // change background colour if dragging            
            ...draggableStyle // styles we need to apply on draggabl
        }
    };

    const getListStyle = (isDraggingOver: boolean): CSSProperties => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });


    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            itemsState,
            result.source.index,
            result.destination.index
        );

        console.log(items);
        setItemsState(items)
    }

    return (
        <div className='m-3'>
            <DragDropContext
                onDragEnd={onDragEnd}>

                <Droppable
                    droppableId="droppable">

                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>

                            {itemsState.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>

                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style as DraggingStyle
                                            )}>
                                            <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
                                            
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}

                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default TaskDragDrop