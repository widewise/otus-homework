import { tree } from "./tree";
import fs from 'fs/promises';
import path from 'path';

jest.mock('fs/promises');
jest.mock('path');

describe('tree', () => {
    const pathInput = 'some-path';
    let actual;

    beforeAll(() => {
        (path.resolve as jest.Mock).mockImplementation((x, y) => `${x}\\${y}`);
    });

    describe('empty folder', () => {
        beforeEach(async () => {
            //act
            actual = await tree('');
        });

        it('should return empty arrays', () => {
            expect(actual.files).toEqual([]);
            expect(actual.folders).toEqual([]);
        });
    });

    describe('path only with files', () => {
        const expectedFiles = ['file1','file2','file3'];
        beforeEach(async () => {
            //arrange
            (fs.readdir as jest.Mock).mockImplementationOnce(() => Promise.resolve(expectedFiles));
            (fs.stat as jest.Mock).mockImplementationOnce(() => Promise.resolve({
                    isDirectory: () => false
                }));

            //act
            actual = await tree(pathInput);
        });

        it('should return empty arrays', () => {
            expect(actual.files).toEqual(expectedFiles.map(file => `${pathInput}\\${file}`));
            expect(actual.folders).toEqual([]);
        });
    });

    describe('path folder with files', () => {
        const subFolderName = 'subFolder';
        const rootDirItems = ['file1','file2', subFolderName];
        const subDirItems = ['file3','file4'];
        beforeEach(async () => {
            //arrange
            (fs.readdir as jest.Mock).mockImplementationOnce(() => Promise.resolve(rootDirItems));
            (fs.readdir as jest.Mock).mockImplementationOnce(() => Promise.resolve(subDirItems));
            (fs.stat as jest.Mock).mockImplementation((item) => Promise.resolve({
                isDirectory: () => {
                    return item.endsWith(subFolderName)
                }
            }));

            //act
            actual = await tree(pathInput);
        });

        it('should return empty arrays', () => {
            expect(actual.files).toEqual([
                `${pathInput}\\${rootDirItems[0]}`,
                `${pathInput}\\${rootDirItems[1]}`,
                `${pathInput}\\${rootDirItems[2]}\\${subDirItems[0]}`,
                `${pathInput}\\${rootDirItems[2]}\\${subDirItems[1]}`
            ]);
            expect(actual.folders).toEqual([`${pathInput}\\${rootDirItems[2]}`]);
        });
    });
});