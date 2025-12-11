// Role model for PostgreSQL
module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define('Role', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
				len: [3, 50],
				isLowercase: false
			}
		},
		description: { type: DataTypes.STRING },
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	}, {
		timestamps: true,
		tableName: 'Roles',
	});

	// Associations
	Role.associate = (models) => {
		Role.belongsToMany(models.Permission, { through: 'RolePermissions', foreignKey: 'roleId' });
		Role.hasMany(models.Audit, { foreignKey: 'roleId' });
	};

	return Role;
};
