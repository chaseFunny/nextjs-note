"use client";
import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

// 定义物料类型
interface Material {
  id: string;
  content: string;
}

// 初始化物料列表
const initialMaterials: Material[] = [
  { id: "1", content: "Button" },
  { id: "2", content: "Input" },
  { id: "3", content: "Checkbox" },
];

const LowCodePlatform: React.FC = () => {
  const [materials] = React.useState(initialMaterials);
  const [designArea, setDesignArea] = React.useState<Material[]>([]);

  // 拖拽结束事件处理函数
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // 如果没有目标位置，直接返回
    if (!destination) {
      return;
    }

    // 从物料列表拖拽到设计区
    if (
      source.droppableId === "materials" &&
      destination.droppableId === "designArea"
    ) {
      const draggedItem = materials[source.index];
      setDesignArea([
        ...designArea,
        { ...draggedItem, id: `${draggedItem.id}-${new Date().getTime()}` },
      ]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        {/* 左侧物料列表 */}
        <Droppable droppableId="materials" isDropDisabled={true}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                width: "200px",
                padding: "10px",
                border: "1px solid black",
              }}
            >
              <h3>物料列表</h3>
              {materials.map((material, index) => (
                <Draggable
                  key={material.id}
                  draggableId={material.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "8px",
                        margin: "4px",
                        backgroundColor: "lightgrey",
                        border: "1px solid grey",
                        userSelect: "none", // 确保文本不可选中
                        ...provided.draggableProps.style,
                      }}
                    >
                      {material.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* 中间设计区 */}
        <Droppable droppableId="designArea">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid black",
                marginLeft: "10px",
              }}
            >
              <h3>设计区</h3>
              {designArea.map((material, index) => (
                <div
                  key={material.id}
                  style={{
                    padding: "8px",
                    margin: "4px",
                    backgroundColor: "lightblue",
                    border: "1px solid grey",
                  }}
                >
                  {material.content}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default LowCodePlatform;
