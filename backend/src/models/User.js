// User model for PostgreSQL
// Example using Sequelize ORM
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('User', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		documentId: { type: DataTypes.STRING, allowNull: false, unique: true }, // Número de documento
		name: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false },
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	});
};
