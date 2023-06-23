class Cargo {
    static SIZE = 100;
    static MAX_MASS = 14000; // Kg
    static MAX_VOLUME = 17.63; // m³
    static OVERMASS_PENALTY = 0.3;
    static OVERVOLUME_PENALTY = 0.3;

    static generateCargo(item_count = null) {
        item_count ||= Cargo.SIZE;

        let cargo = [];
        for (let i = 0; i < item_count; i++) {
            cargo.push({
                name: `Item ${i + 1}`,
                volume: (Math.floor(Math.random() * 5) + 1) / 10, // [0.1, 0.5] m³
                mass: Math.floor(Math.random() * 301) + 100, // [100 , 400] Kg
            });
        }

        return cargo;
    }
}
