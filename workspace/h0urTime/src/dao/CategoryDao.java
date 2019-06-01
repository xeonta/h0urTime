package model.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import exceptions.DbException;
import model.Category;
import model.DbConnection;

public class CategoryDao extends GenericDao<Category> {

	public CategoryDao(DbConnection conn) {
		super(Category.class, "Category", conn);
	}
	
	@Override
	public Category insert(Category entity) throws DbException {
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		try {
			// NULL is working cause of NOT NULL AUTOINCREMENT combination
			// at primary key create table statement!!!
			String sql = "INSERT INTO " + this.tableName + " VALUES (NULL,?,?)";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, entity.getName());
			preparedStatement.setString(2, entity.getColor());
			
			// get last auto generated id and assign to entity
			entity.setCategoryid(this.getLastAutoincrementId(preparedStatement));
			
			int affectedRows = preparedStatement.executeUpdate();
			
			// if no affected rows, show error
			if (affectedRows != 1) 
				throw new SQLException("Insert failed");
			
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not insert entity=" + entity.toString(), e);
		}
		return entity;
}

	@Override
	public Category loadById(int id) throws DbException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Category> loadAll() throws DbException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Category update(Category entity) throws DbException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(int id) throws DbException {
		// TODO Auto-generated method stub
		
	}
}
