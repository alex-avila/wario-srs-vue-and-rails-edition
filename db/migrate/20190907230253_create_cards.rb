class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :front
      t.string :back
      t.references :deck, null: false, foreign_key: true
      t.text :available_at
      t.integer :srs_stage
      t.boolean :has_been_seen

      t.timestamps
    end
  end
end
