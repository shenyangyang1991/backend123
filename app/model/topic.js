'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Topic = app.model.define('Topic', {
    title: {
      type: STRING(14),
      allowNull: false,
    },
  });

  const TopicProps = app.model.define('TopicProps', {
    join_count: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    post_count: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
  });

  Topic.belongsTo(TopicProps, {
    foreignKey: 'prop_id',
  });

  Topic.findList = async function () {
    let row = await this.findAll({
      where: {
        status: '1'
      },
    });
    if (row) {
      row.forEach(item => {
        console.log(item.get({
          plain: true,
        }))
      });
    }
  }

  return Topic;
}