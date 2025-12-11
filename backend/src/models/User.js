// User model for PostgreSQL
// Example using Sequelize ORM
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		documentId: { type: DataTypes.STRING, allowNull: false, unique: true },
		name: { type: DataTypes.STRING, allowNull: false },
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: { isEmail: true }
		},
		password: { type: DataTypes.STRING, allowNull: false },
		status: {
			type: DataTypes.ENUM('active', 'inactive'),
			defaultValue: 'active',
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		createdBy: { type: DataTypes.INTEGER, allowNull: true },
		updatedBy: { type: DataTypes.INTEGER, allowNull: true }
	}, {
		timestamps: true,
		tableName: 'Users',
	});

	// Associations
	User.associate = (models) => {
		User.belongsToMany(models.Role, { through: 'UserRoles', foreignKey: 'userId' });
		User.hasMany(models.Audit, { foreignKey: 'userId' });
	};

	return User;
};
