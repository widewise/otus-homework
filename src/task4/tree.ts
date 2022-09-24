import { readdir, stat } from 'fs/promises';
import path from 'path'

export interface IFileTree {
  files: string[],
  folders: string[],
}

export const tree = async (pathInput: string): Promise<IFileTree> => {
  let files: string[] = [];
  let folders: string[] = [];

  if(!pathInput){
    return { files, folders };
  }

  const folderItems = await readdir(pathInput);
  if(!folderItems){
    return { files, folders };
  }
  for (const folderItem of folderItems) {
    const fullFolderItemName = path.resolve(pathInput, folderItem);
    const folderItemStat = await stat(fullFolderItemName);
    if(folderItemStat && folderItemStat.isDirectory())
    {
      folders.push(fullFolderItemName);

      const subFolderResult = await tree(fullFolderItemName);
      files = files.concat(subFolderResult.files);
      folders = folders.concat(subFolderResult.folders);
    }
    else {
      files.push(fullFolderItemName);
    }
  }
  return { files, folders };
};

if (process.argv[2]) {
  tree(process.argv[2]).then(result => {
    console.log('Files:');
    result.files.forEach(file => console.log(file));
    console.log('Folders:');
    result.folders.forEach(folder => console.log(folder));
  });
}
