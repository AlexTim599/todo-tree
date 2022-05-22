// export const buildTree = (data) => {
//     const { labels, entityLongIds, parentEntityLongIds } = data;
//     const tree = {};
//     let activeLevel = tree;

//     for (let i = 0; i < labels.length; i += 1) {
//         const node = labels[i];

//         if (node.startsWith('element')) {
//             const [_, level] = node.split(' ');
//             const splitedLevel = level.split('.');

//             if (splitedLevel.length === 1) {
//                 tree[level] = {
//                     level,
//                     levelDepth: 1,
//                     content: node,
//                     id: entityLongIds[i],
//                     parentId: parentEntityLongIds[i] === -1 ? null : parentEntityLongIds[i],
//                     children: [],
//                 }
//                 activeLevel = tree[level];
//             } else {
//                 activeLevel.children.push({
//                     level,
//                     levelDepth: splitedLevel.length,
//                     content: node,
//                     id: entityLongIds[i],
//                     parentId: parentEntityLongIds[i],
//                     children: []
//                 });
//                 activeLevel = activeLevel.children[activeLevel.children.length - 1]
//             }
//         } else {
//             activeLevel.children.push({
//                 id: entityLongIds[i],
//                 parentId: parentEntityLongIds[i],
//                 level: activeLevel.level,
//                 levelDepth: activeLevel.levelDepth,
//                 content: node,
//                 children: null
//             })
//         }
//     }

//     return tree;
// }


export const buildTree = (data) => {
    const { labels, entityLongIds, parentEntityLongIds } = data;

    return labels.map((item, index) => {
        return {

            content: item,
            id: entityLongIds[index],
            parentId: parentEntityLongIds[index] === -1 ? null : parentEntityLongIds[index],
        }
    });
}

