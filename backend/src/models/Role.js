// Role model for PostgreSQL
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Role', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false, unique: true },
		description: { type: DataTypes.STRING },
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	});
};
