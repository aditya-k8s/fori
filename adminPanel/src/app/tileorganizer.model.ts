export class TileOrganizer {
    // this is index instead of length
    static MAX_TILES = 17;
    tiles:any| { [id: number]: number } = {};
    tileStates:any| { [id: number]: boolean } = {};
    remoteTileCount = 0;
  
    acquireTileIndex(tileId: number): number {
      for (let index = 0; index <= TileOrganizer.MAX_TILES; index++) {
        if (this.tiles[index] === tileId) {
          return index;
        }
      }
      for (let index = 0; index <= TileOrganizer.MAX_TILES; index++) {
        if (!(index in this.tiles)) {
          this.tiles[index] = tileId;
          this.remoteTileCount++;
          return index;
        }
      }
      throw new Error('no tiles are available');
    }
  
    releaseTileIndex(tileId: number): number {
      for (let index = 0; index <= TileOrganizer.MAX_TILES; index++) {
        if (this.tiles[index] === tileId) {
          this.remoteTileCount--;
          delete this.tiles[index];
          return index;
        }
      }
      return TileOrganizer.MAX_TILES;
    }
  }